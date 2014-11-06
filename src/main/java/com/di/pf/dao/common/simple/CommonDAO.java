/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.dao.common.simple;

import com.di.pf.domain.common.ApplicantType;
import com.di.pf.domain.common.BuildingMainClass;
import java.util.List;

/**
 *
 * @author avg
 */
public interface CommonDAO extends Count {

    public List<ApplicantType> getApplicantType(Integer start, Integer limit,String name);

    public List<BuildingMainClass> getBuildingMainClass(Integer start, Integer limit,String name);
}
