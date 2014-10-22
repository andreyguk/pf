/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.dao;

/**
 *
 * @author avg
 * @param <T>
 * @param <ID> fdgdfgdfgdf
 */
public interface GenericDAO<T, ID> {

    public T find(ID id);

    public void persist(T obj);

    public T megre(T obj);

    public void remove(T obj);

}
