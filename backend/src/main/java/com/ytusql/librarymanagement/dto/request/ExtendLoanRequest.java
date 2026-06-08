package com.ytusql.librarymanagement.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExtendLoanRequest {

    @NotNull(message = "Extension days is required.")
    private Integer extensionDays;
}