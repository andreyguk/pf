/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.dao.common.simple;

import com.di.pf.domain.common.*;
import com.di.pf.domain.common.ApplicantType_;
import com.di.pf.domain.common.BuildingMainClass;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author avg
 */
@Repository("commonDAO")
@Transactional
public class CommonDAOImpl implements CommonDAO {

    final private Logger logger = LoggerFactory.getLogger(this.getClass());

    @PersistenceContext(unitName = "pf")
    private EntityManager em;

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public List<ApplicantType> getApplicantType(Integer start, Integer limit, String name) {
        TypedQuery<ApplicantType> query;
        query = em.createNamedQuery("ApplicantType.findAll", ApplicantType.class);
        if (!name.isEmpty()) {
            query = em.createNamedQuery("ApplicantType.findByName", ApplicantType.class).setParameter("name", name);
        }
        return query.getResultList();
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public List<BuildingMainClass> getBuildingMainClass(Integer start, Integer limit, String name) {
        TypedQuery<BuildingMainClass> query = em.createNamedQuery("BuildingMainClass.findAll", BuildingMainClass.class);
        return query.setFirstResult(start).setMaxResults(limit).getResultList();
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public Long getApplicantTypeCount() {
        return em.createNamedQuery("ApplicantType.countAll", Long.class).getSingleResult();
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public Long getBuildingMainClassCount() {
        return em.createNamedQuery("BuildingMainClass.countAll", Long.class).getSingleResult();
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public List<Territory> getTerritory(Integer start, Integer limit, Integer territoryId, String fullname) {
        TypedQuery<Territory> query;
        query = em.createNamedQuery("Territory.findAll", Territory.class);
        if (!fullname.isEmpty()) {
            query = em.createNamedQuery("Territory.findByFullname", Territory.class).setParameter("fullname", fullname);
        }
        return query.getResultList();
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public Long getTerritoryCount() {
        return em.createNamedQuery("Territory.countAll", Long.class).getSingleResult();
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public List<Roles> getUserRoles(Integer start, Integer limit, String name) {
        TypedQuery<Roles> query;
        query = em.createNamedQuery("Roles.findAll", Roles.class);
        if (!name.isEmpty()) {
            query = em.createNamedQuery("Roles.findByName", Roles.class).setParameter("name", name);
        }
        return query.getResultList();
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public Long getUserRolesCount() {
        return em.createNamedQuery("Roles.countAll", Long.class).getSingleResult();
    }
}
