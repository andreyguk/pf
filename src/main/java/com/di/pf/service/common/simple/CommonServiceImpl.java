/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.service.common.simple;

import com.di.pf.domain.common.*;
import com.di.pf.dao.common.simple.CommonDAO;
import com.di.pf.dto.vo.*;
import com.di.pf.service.AbstactService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Transactional
@Service("commonService")
public class CommonServiceImpl extends AbstactService implements CommonService {

    @Autowired
    protected CommonDAO commonDAO;

    public CommonServiceImpl() {
        super();
    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    @Override
    public Result<List<ApplicantType>> getApplicantType(String actionUser, Integer start, Integer limit, String name) {
        if (isValidUser(actionUser)) {
            return ResultFactory.getSuccessResult(commonDAO.getApplicantType(start, limit, name), commonDAO.getApplicantTypeCount());
        } else {
            return ResultFactory.getFailResult(USER_INVALID);
        }
    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    @Override
    public Result<List<BuildingMainClass>> getBuildingMainClass(String actionUser, Integer start, Integer limit, String name) {
        if (isValidUser(actionUser)) {
            return ResultFactory.getSuccessResult(commonDAO.getBuildingMainClass(start, limit, name), commonDAO.getBuildingMainClassCount());
        } else {
            return ResultFactory.getFailResult(USER_INVALID);
        }
    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    @Override
    public Result<List<Territory>> getTerritory(String actionUser, Integer start, Integer limit, Integer id, String fullname) {
        if (isValidUser(actionUser)) {
            return ResultFactory.getSuccessResult(commonDAO.getTerritory(start, limit, id, fullname), commonDAO.getTerritoryCount());
        } else {
            return ResultFactory.getFailResult(USER_INVALID);
        }
    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    @Override
    public Result<List<Roles>> getUserRoles(String actionUser, Integer start, Integer limit, String name) {
        if (isValidUser(actionUser)) {
            return ResultFactory.getSuccessResult(commonDAO.getUserRoles(start, limit, name), commonDAO.getUserRolesCount());
        } else {
            return ResultFactory.getFailResult(USER_INVALID);
        }
    }

}
