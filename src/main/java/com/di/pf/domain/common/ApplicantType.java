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
@Table(name = "dict.applicanttype")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ApplicantType.findAll", query = "SELECT a FROM ApplicantType a"),
    @NamedQuery(name = "ApplicantType.countAll", query = "SELECT count(a) FROM ApplicantType a"),
    @NamedQuery(name = "ApplicantType.findById", query = "SELECT a FROM ApplicantType a WHERE a.id = :id"),
    @NamedQuery(name = "ApplicantType.findByCode", query = "SELECT a FROM ApplicantType a WHERE a.code = :code"),
    @NamedQuery(name = "ApplicantType.findByName", query = "SELECT a FROM ApplicantType a WHERE a.name = :name")})
public class ApplicantType extends AbstractEntity {

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

    public ApplicantType() {
    }

    public ApplicantType(Integer id) {
        this.id = id;
    }

    public ApplicantType(Integer id, String code, String name) {
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
        int hash = 7;
        hash = 37 * hash + Objects.hashCode(this.id);
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
        final ApplicantType other = (ApplicantType) obj;
        return Objects.equals(this.id, other.id);
    }

    @Override
    public String toString() {
        return "com.di.pf.domain.Organization[ id=" + id + " ]";
    }

    @Override
    public void addJson(JsonObjectBuilder builder) {

        builder.add("id", id).add("name", name).add("code", code);
    }

}
