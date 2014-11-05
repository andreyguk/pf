/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.domain.common;

import com.di.pf.domain.AbstractEntity;
import com.di.pf.domain.AbstractEntity;
import java.io.Serializable;
import java.util.Objects;
import javax.json.JsonObjectBuilder;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author avg
 */
@Entity
@Table(name = "dict.buildingmainclass")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "BuildingMainClass.findAll", query = "SELECT b FROM BuildingMainClass b"),
    @NamedQuery(name = "BuildingMainClass.countAll", query = "SELECT count(b) FROM BuildingMainClass b"),
    @NamedQuery(name = "BuildingMainClass.findById", query = "SELECT b FROM BuildingMainClass b WHERE b.id = :id"),
    @NamedQuery(name = "BuildingMainClass.findByCode", query = "SELECT b FROM BuildingMainClass b WHERE b.code = :code"),
    @NamedQuery(name = "BuildingMainClass.findByName", query = "SELECT b FROM BuildingMainClass b WHERE b.name = :name"),
    @NamedQuery(name = "BuildingMainClass.countAll", query = "SELECT count(b) FROM BuildingMainClass b")})
public class BuildingMainClass extends AbstractEntity {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 250)
    @Column(name = "code")
    private String code;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 250)
    @Column(name = "name")
    private String name;

    public BuildingMainClass() {
    }

    public BuildingMainClass(Integer id) {
        this.id = id;
    }

    public BuildingMainClass(Integer id, String code, String name) {
        this.id = id;
        this.code = code;
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 97 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final BuildingMainClass other = (BuildingMainClass) obj;
        return Objects.equals(this.id, other.id);
    }

    @Override
    public String toString() {
        return "com.di.pf.domain.directory.BuildingMainClass[ id=" + id + " ]";
    }

    @Override
    public void addJson(JsonObjectBuilder builder) {

        builder.add("id", id).add("name", name).add("code", code);
    }
}
