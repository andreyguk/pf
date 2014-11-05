/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.dao;

import com.di.pf.domain.Organization;
import java.util.List;
import static org.junit.Assert.assertTrue;
import org.junit.Test;

/**
 *
 * @author avg
 */
public class OrganizationDAOTest extends AbstractDAOTest {

    public OrganizationDAOTest() {
    }

    /**
     *
     * @throws Exception
     */
    @Test
    public void testFind() throws Exception {
        logger.debug("\nSTARTED testFind()\n");
        List<Organization> allItems = organizationDAO.findAll(10, 20);
        assertTrue(allItems.size() > 0);
        // get the first item in the list
        Organization c1 = allItems.get(0);
        int id = c1.getId();
        Organization c2 = organizationDAO.find(1);
        //assertTrue(c1.equals(c2));
        logger.debug("\nFINISHED testFind()\n");
    }

    /**
     * Test case for the findAll() method of the CompanyDao implementation
     *
     * @throws Exception
     */
    @Test
    public void testFindAll() throws Exception {

        logger.debug("\nSTARTED testFindAll()\n");
        int rowCount = countRowsInTable("model.organization");
    
        if (rowCount > 0) {

            List<Organization> allItems = organizationDAO.findAll(10, 20);
            //assertTrue("Organization.findAll list not equal to row count of table organization", rowCount == allItems.size());

        } else {
            throw new IllegalStateException("INVALID TESTING SCENARIO: Company table is empty");
        }
        logger.debug("\nFINISHED testFindAll()\n");
    }

    /**
     * Test case for the persist(Company) method of the CompanyDao
     * implementation
     *
     * @throws Exception
     */
    @Test
    //@Rollback(false)
    public void testPersist() throws Exception {

        logger.debug("\nSTARTED testPersist()\n");
        Organization c = new Organization();
        c.setName("test");

        organizationDAO.persist(c);

        //assertTrue(c.getId() != null); // only if flush() is called in GenericDaoImpl
        assertTrue(c.getName().equals("test"));

        logger.debug("\nFINISHED testPersist()\n");
    }

    /**
     * Test case for the merge(Company) method of the CompanyDao implementation
     *
     * @throws Exception
     */
    @Test
    public void testMerge() throws Exception {

        logger.debug("\nSTARTED testMerge()\n");
        final String NEW_NAME = "Merge Test Company New Name";

        Organization c = organizationDAO.findAll(10, 20).get(0);
        c.setName(NEW_NAME);

        c = organizationDAO.megre(c);

        assertTrue(c.getName().equals(NEW_NAME));

        logger.debug("\nFINISHED testMerge()\n");

    }

    /**
     * Test case for the remove(Company) method of the CompanyDao implementation
     *
     * @throws Exception
     */
    @Test
    public void testRemove() throws Exception {

        logger.debug("\nSTARTED testRemove()\n");
        Organization c = organizationDAO.findAll(10, 20).get(0);

        organizationDAO.remove(c);

        List<Organization> allItems = organizationDAO.findAll(10, 20);

        assertTrue("Deleted company may not be in findAll List", !allItems.contains(c));

        logger.debug("\nFINISHED testRemove()\n");
    }
}
