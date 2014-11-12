/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.service.impl;

import com.di.pf.domain.*;
import com.di.pf.dao.OrganizationDAO;
import com.di.pf.dto.vo.Result;
import com.di.pf.dto.vo.ResultFactory;
import com.di.pf.service.OrganizationService;
import com.di.pf.service.AbstactService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Transactional
@Service("organizationService")
public class OrganizationServiceImpl extends AbstactService implements OrganizationService {

    @Autowired
    protected OrganizationDAO organizationDAO;

    public OrganizationServiceImpl() {
        super();
    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    @Override
    public Result<Organization> store(Integer idOrg, String companyName, String actionUser) {
        Users user = userDAO.findByUsername(actionUser);

        Organization organization;

        if (idOrg == null) {
            organization = new Organization();
        } else {
            organization = organizationDAO.find(idOrg);
            if (organization == null) {
                return ResultFactory.getFailResult("\"Unable to find company instance with ID=\"" + idOrg);
            }
        }
        organization.setName(companyName);

        if (organization.getId() == null) {
            organizationDAO.persist(organization);
        } else {
            organization = organizationDAO.megre(organization);
        }

        return ResultFactory.getSuccessResult(organization);
    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    @Override
    public Result<Organization> remove(Integer id, String actionUser) {
        Users user = userDAO.findByUsername(actionUser);      

        if (id == null) {

            return ResultFactory.getFailResult("Unable to remove Company [null idCompany]");

        }
        Organization organization = organizationDAO.find(id);
        if (organization == null) {
            return ResultFactory.getFailResult("Unable to load Company for removal with idCompany=" + id);
        } else {
            //TO DO if organization has users, delete all users
            String msg = "Organization " + organization.getName() + " was deleted by " + actionUser;
            logger.info(msg);
            return ResultFactory.getSuccessResultMsg(msg);
        }
    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    @Override
    public Result<Organization> find(Integer id, String actionUser) {
        if (isValidUser(actionUser)) {
            Organization organization = organizationDAO.find(id);
            return ResultFactory.getSuccessResult(organization);
        } else {
            return ResultFactory.getFailResult(USER_INVALID);
        }
    }

    /**
     *
     * @param actionUser
     * @param start
     * @param limit
     * @return
     */
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    @Override
    public Result<List<Organization>> findAll(String actionUser, Integer start, Integer limit) {
        if (isValidUser(actionUser)) {
            return ResultFactory.getSuccessResult(organizationDAO.findAll(start, limit), organizationDAO.count());

        } else {

            return ResultFactory.getFailResult(USER_INVALID);

        }
    }

}
