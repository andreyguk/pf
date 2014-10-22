/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.dao;

import com.di.pf.domain.Organization;
import java.util.List;

/**
 *
 * @author avg
 */
public interface OrganizationDAO extends GenericDAO<Organization, Integer>{
     //public Organization find(Integer id);
    public List<Organization> findAll();

    //public void persist(Organization organization);
    //public Organization merge(Organization organization);
    //public void remove(Organization organization);
   
}
