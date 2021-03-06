/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.dao;

import com.di.pf.domain.UserRoles;
import com.di.pf.domain.Users;
import java.util.List;

/**
 *
 * @author avg
 */
public interface UsersDAO extends GenericDAO<Users, Integer> {

    public List<Users> findAll(Integer start, Integer limit);

    public Users findByUsernamePassword(String username, String password);

    public Users findByUsername(String username);

    public List<UserRoles> getUserRoles(Integer userId);

    public Long count();
}
