/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.domain.common;

import com.di.pf.domain.AbstractEntity;
import com.di.pf.domain.common.Territory;
import java.io.Serializable;
import java.util.List;
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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author avg
 */
@Entity
@Table(name = "dict.territorytype")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "TerritoryType.findAll", query = "SELECT t FROM TerritoryType t")})
public class TerritoryType extends AbstractEntity {

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
    @Size(max = 250)
    @Column(name = "puppcode")
    private String puppcode;
    @Size(max = 250)
    @Column(name = "shortname")
    private String shortname;
    @Basic(optional = false)
    @NotNull
    @Column(name = "issuffix")
    private boolean issuffix;
    @OneToMany(mappedBy = "type")
    private List<Territory> territoryList;

    public TerritoryType() {
    }

    public TerritoryType(Integer id) {
        this.id = id;
    }

    public TerritoryType(Integer id, String code, String name, boolean issuffix) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.issuffix = issuffix;
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

    public String getPuppcode() {
        return puppcode;
    }

    public void setPuppcode(String puppcode) {
        this.puppcode = puppcode;
    }

    public String getShortname() {
        return shortname;
    }

    public void setShortname(String shortname) {
        this.shortname = shortname;
    }

    public boolean getIssuffix() {
        return issuffix;
    }

    public void setIssuffix(boolean issuffix) {
        this.issuffix = issuffix;
    }

    @XmlTransient
    public List<Territory> getTerritoryList() {
        return territoryList;
    }

    public void setTerritoryList(List<Territory> territoryList) {
        this.territoryList = territoryList;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 61 * hash + Objects.hashCode(this.id);
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
        final TerritoryType other = (TerritoryType) obj;
        return Objects.equals(this.id, other.id);
    }

    @Override
    public String toString() {
        return "com.di.pf.domain.TerritoryType[ id=" + id + " ]";
    }

    @Override
    public void addJson(JsonObjectBuilder builder) {

        builder.add("id", id).add("name", name);

    }
}
