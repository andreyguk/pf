/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.dao.impl;

import com.di.pf.dao.GenericDAOImpl;
import java.io.Serializable;
import com.di.pf.domain.Users;
import com.di.pf.dao.UsersDAO;

/**
 *
 * @author avg
 */
import java.util.List;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author avg
 */
@Repository("usersDAO")
@Transactional
public class UsersDAOImpl extends GenericDAOImpl<Users, Integer> implements UsersDAO {

    public UsersDAOImpl(Class<Users> type) {
        super(Users.class);
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public List<Users> findAll() {
        return em.createNamedQuery("Users.findAll").getResultList();
    }

    /**
     *
     * @param username
     * @param password
     * @return
     */
    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public Users findByUsernamePassword(String username, String password) {
        List<Users> users = em.createNamedQuery("Users.findByUsernamePassword").setParameter("username", username).setParameter("password", password).getResultList();
        return (users.size() == 1 ? users.get(0) : null);
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public Users findByUsername(String username) {
        List<Users> users = em.createNamedQuery("Users.findByUsername").setParameter("username", username).getResultList();
        return (users.size() == 1 ? users.get(0) : null);
    }

}
