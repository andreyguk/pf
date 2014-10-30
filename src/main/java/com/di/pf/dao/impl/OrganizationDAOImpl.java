/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.dao.impl;

import com.di.pf.dao.OrganizationDAO;
import com.di.pf.domain.Organization;
import java.util.List;
import javax.persistence.TypedQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author avg
 */
@Repository("organizationDAO")
@Transactional
public class OrganizationDAOImpl extends GenericDAOImpl<Organization, Integer> implements OrganizationDAO {

    public OrganizationDAOImpl() {
        super(Organization.class);
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public List<Organization> findAll(Integer start, Integer limit) {
        TypedQuery<Organization> query = em.createNamedQuery("Organization.findAll", Organization.class);
        return query.setFirstResult(start).setMaxResults(limit).getResultList();
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public Long count() {
        return em.createNamedQuery("Organization.countAll", Long.class).getSingleResult();
    }

}
