/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.dao.common.simple;

import com.di.pf.domain.Organization;
import com.di.pf.domain.common.ApplicantType;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author avg
 * @param <T>
 */
@Repository("CommonDImpl")
@Transactional
public class CommonDImpl<T> {

    final private Logger logger = LoggerFactory.getLogger(this.getClass());

    @PersistenceContext(unitName = "pf")
    private EntityManager em;

    public List<T> getSimpleData(Class<T> clad, String className, Integer start, Integer limit, String name) {
        TypedQuery<T> query;

        query = em.createNamedQuery(className + ".findAll", clad);

        return query.getResultList();
    }

}
