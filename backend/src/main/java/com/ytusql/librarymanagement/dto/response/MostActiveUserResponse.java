package com.ytusql.librarymanagement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MostActiveUserResponse {

    private String userName;
    private Long loanCount;
}
