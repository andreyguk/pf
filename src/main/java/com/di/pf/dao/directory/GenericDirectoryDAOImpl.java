/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.dao.directory;

import com.di.pf.dao.impl.*;
import com.di.pf.dao.GenericDAO;
import java.io.Serializable;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author avg
 * @param <T>
 * @param <ID>
 */
public class GenericDirectoryDAOImpl<T, ID extends Serializable> implements GenDirectoryDAO<T, ID> {

    final protected Logger logger = LoggerFactory.getLogger(this.getClass());
    @PersistenceContext(unitName = "pf")
    protected EntityManager em;

    private final Class<T> type;

    public GenericDirectoryDAOImpl(Class<T> type) {
        this.type = type;
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public T find(ID id) {
        return (T) em.find(type, id);
    }

    @Override
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    public void persist(T obj) {
        em.persist(obj);
    }

    @Override
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    public T megre(T obj) {
        obj = em.merge(obj);
        return obj;
    }

    @Override
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    public void remove(T obj) {
        obj = megre(obj);
        em.remove(obj);

    }

}
