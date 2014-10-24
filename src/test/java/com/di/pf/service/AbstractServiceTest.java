/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;

/**
 *
 * @author avg
 */
@ContextConfiguration({"/testingContext.xml"})
public abstract class AbstractServiceTest extends AbstractTransactionalJUnit4SpringContextTests {

    protected final Logger logger = LoggerFactory.getLogger(this.getClass());
}
