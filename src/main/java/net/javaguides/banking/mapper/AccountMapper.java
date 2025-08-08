package net.javaguides.banking.mapper;

import net.javaguides.banking.dto.AccountDto;
import net.javaguides.banking.entity.Account;

import java.math.BigDecimal;

public final class AccountMapper {
    private AccountMapper() {}

    // Map DTO -> Entity (password already encoded)
    public static Account toEntity(AccountDto dto, String passwordHash) {
        if (dto == null) return null;
        return Account.builder()
                .id(dto.getId())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .balance(dto.getBalance() != null ? dto.getBalance() : BigDecimal.ZERO)
                .username(dto.getUsername())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .passwordHash(passwordHash)
                .build();
    }

    // Map Entity -> DTO (DO NOT expose password)
    public static AccountDto toDto(Account entity) {
        if (entity == null) return null;
        return AccountDto.builder()
                .id(entity.getId())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .balance(entity.getBalance())
                .username(entity.getUsername())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                // no password in responses
                .build();
    }
}
