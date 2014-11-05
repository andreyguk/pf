/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.service;

import com.di.pf.dao.OrganizationDAO;
import com.di.pf.domain.Organization;
import com.di.pf.dto.vo.Result;
import com.di.pf.service.OrganizationService;
import java.util.List;
import static org.junit.Assert.assertTrue;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author avg
 */
public class OrganizationServiceTest extends AbstractServiceTest {

    protected final String TEST_USERNAME = "test";
    @Autowired
    protected OrganizationService organizationService;

    @Test
    public void testFind() throws Exception {

        logger.debug("\nSTARTED testFind()\n");
        Result<List<Organization>> allItems = organizationService.findAll(TEST_USERNAME, 10, 20);

        assertTrue(allItems.getData().size() > 0);

        // get the first item in the list
        Organization c1 = allItems.getData().get(0);

        int id = c1.getId();

        Result<Organization> c2 = organizationService.find(id, TEST_USERNAME);

        assertTrue(c1.equals(c2.getData()));
        logger.debug("\nFINISHED testFind()\n");
    }

    /**
     * Test case for the findAll() method of the CompanyService implementation
     *
     * @throws Exception
     */
    @Test
    public void testFindAll() throws Exception {

        logger.debug("\nSTARTED testFindAll()\n");
        int rowCount = countRowsInTable("model.organization");

        if (rowCount > 0) {

            Result<List<Organization>> allItems = organizationService.findAll(TEST_USERNAME, 10, 20);
            //assertTrue("Organization.findAll list not equal to row count of table ttt_company", rowCount == allItems.getData().size());

        } else {
            throw new IllegalStateException("INVALID TESTING SCENARIO: Company table is empty");
        }
        logger.debug("\nFINISHED testFindAll()\n");
    }

    /**
     * Test case adding a new company of the CompanyService implementation
     *
     * @throws Exception
     */
    @Test
    public void testAddNew() throws Exception {

        logger.debug("\nSTARTED testAddNew()\n");
        //Organization c = new Organization();
        final String NEW_NAME = "New Test Company name";
        //c.setName(NEW_NAME);

        Result<Organization> c2 = organizationService.store(null, NEW_NAME, TEST_USERNAME);

        //assertTrue(c2.getData().getName().equals(NEW_NAME));
        logger.debug("\nFINISHED testAddNew()\n");
    }

    /**
     * Test case for updating a company of the CompanyService implementation
     *
     * @throws Exception
     */
    @Test
    public void testUpdate() throws Exception {

        logger.debug("\nSTARTED testUpdate()\n");
        final String NEW_NAME = "Update Test Company New Name";

        Result<List<Organization>> ar1 = organizationService.findAll(TEST_USERNAME, 10, 20);
        Organization c = ar1.getData().get(0);
        c.setName(NEW_NAME);

        organizationService.store(c.getId(), NEW_NAME, TEST_USERNAME);

        Result<Organization> ar2 = organizationService.find(c.getId(), TEST_USERNAME);

        assertTrue(ar2.getData().getName().equals(NEW_NAME));

        logger.debug("\nFINISHED testMerge()\n");

    }

    /**
     * Test case for the remove(Company) method of the CompanyService
     * implementation
     *
     * @throws Exception
     */
    @Test
    public void testRemove() throws Exception {

        logger.debug("\nSTARTED testRemove()\n");
        Result<List<Organization>> ar1 = organizationService.findAll(TEST_USERNAME, 10, 20);
        Organization c = ar1.getData().get(0);

        Result<Organization> ar = organizationService.remove(c.getId(), TEST_USERNAME);
        Result<Organization> ar2 = organizationService.find(c.getId(), TEST_USERNAME);

        // should fail as projects assigned
        assertTrue(!ar.isSuccess());
        // finder still works
        assertTrue(ar2.getData() != null);

        logger.debug("\ntestRemove() - UNABLE TO DELETE TESTS PASSED\n");
        // remove all the projects
        c = ar2.getData();

        logger.debug("\nFINISHED testRemove()\n");
    }

}
