/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.service;

import com.di.pf.dao.UsersDAO;
import com.di.pf.domain.Users;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author avg
 */
public abstract class AbstactService {

    protected final Logger logger = LoggerFactory.getLogger(this.getClass());
    protected final String USER_INVALID = "Not a valid user";
    protected final String USER_NOT_ADMIN = "Not an admin user";

    @Autowired
    protected UsersDAO userDAO;

    protected boolean isValidUser(String username) {
        Users user = userDAO.findByUsername(username);
        //return user != null;
        return true;
    }
}
