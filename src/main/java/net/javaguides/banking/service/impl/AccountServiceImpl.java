package net.javaguides.banking.service.impl;

import net.javaguides.banking.dto.AccountDto;
import net.javaguides.banking.entity.Account;
import net.javaguides.banking.mapper.AccountMapper;
import net.javaguides.banking.respository.AccountRepository;
import net.javaguides.banking.service.AccountService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public AccountServiceImpl(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AccountDto createAccount(AccountDto accountDto) {
        // Encode raw password from DTO
        String hashed = passwordEncoder.encode(accountDto.getPassword());

        // Map DTO to Entity with hashed password
        Account account = AccountMapper.toEntity(accountDto, hashed);

        // Save to DB
        Account saved = accountRepository.save(account);

        // Return DTO (password will be null because mapper doesn't set it)
        return AccountMapper.toDto(saved);
    }

    @Override
    public AccountDto getAccountById(Long id) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account does not exist."));
        return AccountMapper.toDto(account);
    }

    @Override
    public AccountDto deposit(Long id, double amount) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account does not exist."));

        BigDecimal newTotal = account.getBalance().add(BigDecimal.valueOf(amount));
        account.setBalance(newTotal);

        Account saved = accountRepository.save(account);
        return AccountMapper.toDto(saved);
    }

    @Override
    public AccountDto withdraw(Long id, double amount) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account does not exist."));

        if (account.getBalance().compareTo(BigDecimal.valueOf(amount)) < 0) {
            throw new RuntimeException("Insufficient funds");
        }

        BigDecimal newTotal = account.getBalance().subtract(BigDecimal.valueOf(amount));
        account.setBalance(newTotal);

        Account saved = accountRepository.save(account);
        return AccountMapper.toDto(saved);
    }

    @Override
    public List<AccountDto> getAllAccounts() {
        return accountRepository.findAll()
                .stream()
                .map(AccountMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteAccount(Long id) {
        if (!accountRepository.existsById(id)) {
            throw new RuntimeException("Account does not exist.");
        }
        accountRepository.deleteById(id);
    }
}
