/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.service.impl;

import com.di.pf.domain.Users;
import com.di.pf.dto.vo.Result;
import com.di.pf.service.UsersService;
import java.util.List;


public class UsersServiceImpl implements UsersService {

    public Result<Users> store(Integer id, String companyName, String actionUser) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    public Result<Users> remove(Integer id, String actionUser) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    public Result<Users> find(Integer id, String actionUser) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    public Result<List<Users>> findAll(String actionUser) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
