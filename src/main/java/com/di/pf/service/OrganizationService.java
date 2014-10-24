/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.service;

import com.di.pf.dto.vo.Result;
import com.di.pf.domain.Organization;
import java.util.List;

/**
 *
 * @author avg
 */
public interface OrganizationService {

    public Result<Organization> store(
            Integer id,
            String companyName,
            String actionUser);

    public Result<Organization> remove(Integer id, String actionUser);

    public Result<Organization> find(Integer id, String actionUser);

    public Result<List<Organization>> findAll(String actionUser);
}
