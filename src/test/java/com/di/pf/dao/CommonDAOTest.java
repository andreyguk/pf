/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.dao;

import com.di.pf.domain.common.ApplicantType;
import com.di.pf.domain.Organization;
import com.di.pf.dao.common.simple.CommonDAOImpl;
import com.di.pf.dao.common.simple.CommonDAO;
import com.di.pf.domain.common.BuildingMainClass;

import java.util.List;
import static org.junit.Assert.assertTrue;
import org.junit.Test;

/**
 *
 * @author avg
 */
public class CommonDAOTest extends AbstractDAOTest {

    public CommonDAOTest() {
    }

    /**
     * Test case for the findAll() method of the CompanyDao implementation
     *
     * @throws Exception
     */
    @Test
    public void testFindAll() throws Exception {

        logger.debug("\nSTARTED testFindAll()\n");
        int rowCount = countRowsInTable("dict.applicanttype");
        logger.debug("4545454545=" + commonDAO.getApplicantTypeCount());
        if (rowCount > 0) {

            List<ApplicantType> allItems = commonDAO.getApplicantType(0, 10);

            assertTrue("Organization.findAll list not equal to row count of table organization", rowCount == allItems.size());

        } else {
            throw new IllegalStateException("INVALID TESTING SCENARIO: Company table is empty");
        }
        logger.debug("\nFINISHED testFindAll()\n");
    }

    @Test
    public void testFindAll2() throws Exception {

        logger.debug("\nSTARTED testFindAll()\n");
        int rowCount = countRowsInTable("dict.buildingmainclass");
        logger.debug("33333333=" + rowCount);
        if (rowCount > 0) {

            List<BuildingMainClass> allItems = commonDAO.getBuildingMainClass(0, 10);

            assertTrue("buildingmainclass.findAll list not equal to row count of table organization", rowCount == allItems.size());

        } else {
            throw new IllegalStateException("INVALID TESTING SCENARIO: Company table is empty");
        }
        logger.debug("\nFINISHED testFindAll()\n");
    }

}
