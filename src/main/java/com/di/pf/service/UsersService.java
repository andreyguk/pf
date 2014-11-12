/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.service;

import com.di.pf.dto.vo.Result;
import com.di.pf.domain.Users;
import com.di.pf.domain.UserRoles;
import java.util.List;

/**
 *
 * @author avg
 */
public interface UsersService {

    public Result<Users> store(
            Integer id,
            String companyName,
            String actionUser);

    public Result<Users> remove(Integer id, String actionUser);

    public Result<Users> find(Integer id, String actionUser);

    public Result<List<Users>> findAll(String actionUser, Integer start, Integer limit);

    public Result<List<UserRoles>> getUserRoles(Integer userId);

    public Result<Users> findByUsernamePassword(String username, String password);

}
