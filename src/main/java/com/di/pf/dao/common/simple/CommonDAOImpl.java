/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.dao.common.simple;

import com.di.pf.domain.common.ApplicantType;
import com.di.pf.domain.common.BuildingMainClass;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
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
    public List<ApplicantType> getApplicantType(Integer start, Integer limit) {
        TypedQuery<ApplicantType> query = em.createNamedQuery("ApplicantType.findAll", ApplicantType.class);
        return query.getResultList();
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public List<BuildingMainClass> getBuildingMainClass(Integer start, Integer limit) {
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
    public Long getBuildingMainClass() {
        return em.createNamedQuery("BuildingMainClass.countAll", Long.class).getSingleResult();
    }

}
