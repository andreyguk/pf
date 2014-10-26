/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.service.impl;

import com.di.pf.dao.UsersDAO;
import com.di.pf.domain.Users;
import com.di.pf.dto.vo.Result;
import com.di.pf.dto.vo.ResultFactory;
import com.di.pf.service.UsersService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import com.di.pf.service.AbstactService;

public class UsersServiceImpl extends AbstactService implements UsersService {

    @Autowired
    protected UsersDAO usersDAO;

    public UsersServiceImpl() {
        super();
    }

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

    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    @Override
    public Result<Users> findByUsernamePassword(String username, String password) {

        Users user = usersDAO.findByUsernamePassword(username, password);

        if (user == null) {

            return ResultFactory.getFailResult("Unable to verify user/password combination!");

        } else {

            return ResultFactory.getSuccessResult(user);
        }

    }

}
