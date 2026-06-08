package com.ytusql.librarymanagement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LibraryStatisticsResponse {

    private String libraryName;
    private Long loanCount;
}