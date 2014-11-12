/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.dao.impl;

import com.di.pf.domain.Users;
import com.di.pf.dao.UsersDAO;
import com.di.pf.domain.UserRoles;

/**
 *
 * @author avg
 */
import java.util.List;
import javax.persistence.TypedQuery;
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

    public UsersDAOImpl() {
        super(Users.class);
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public List<Users> findAll(Integer start, Integer limit) {
        TypedQuery<Users> query = em.createNamedQuery("Users.findAll", Users.class);
        return query.setFirstResult(start).setMaxResults(limit).getResultList();

    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public List<UserRoles> getUserRoles(Integer userId) {
        TypedQuery<UserRoles> query = em.createNamedQuery("UserRoles.findByUserId", UserRoles.class);
        
        return query.setParameter("usr", userId).getResultList();

    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public Long count() {
        return em.createNamedQuery("Users.countAll", Long.class).getSingleResult();
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
        List<Users> users = em.createNamedQuery("Users.findByUsername").setParameter("username", username).getResultList();
        return (users.size() == 1 ? users.get(0) : null);
        //TypedQuery<Users> query = em.createNamedQuery("Users.findAll", Users.class);
        //return query.getResultList().get(0);

    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public Users findByUsername(String username) {
        //List<Users> users = em.createNamedQuery("Users.findByUsername").setParameter("username", username).getResultList();
        //return (users.size() == 1 ? users.get(0) : null);
        TypedQuery<Users> query = em.createNamedQuery("Users.findAll", Users.class);
        return query.getResultList().get(0);

    }

}
