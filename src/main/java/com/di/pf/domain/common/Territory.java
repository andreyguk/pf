/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.domain.common;

import com.di.pf.domain.AbstractEntity;
import java.util.List;
import java.util.Objects;
import javax.json.JsonObjectBuilder;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "dict.territory")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Territory.findAll", query = "SELECT t FROM Territory t")})
public class Territory extends AbstractEntity {

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
    @Size(max = 250)
    @Column(name = "name")
    private String name;
    @Size(max = 250)
    @Column(name = "fullname")
    private String fullname;
    @Size(max = 250)
    @Column(name = "shortname")
    private String shortname;
    @Column(name = "hierarchylevel")
    private Integer hierarchylevel;
    @Column(name = "islowestlevel")
    private Boolean islowestlevel;
    @JoinColumn(name = "type", referencedColumnName = "id")
    @ManyToOne
    private TerritoryType type;
    @OneToMany(mappedBy = "parent")
    private List<Territory> territoryList;
    @JoinColumn(name = "parent", referencedColumnName = "id")
    @ManyToOne
    private Territory parent;
    @OneToMany(mappedBy = "region")
    private List<Territory> territoryList1;
    @JoinColumn(name = "region", referencedColumnName = "id")
    @ManyToOne
    private Territory region;
    @OneToMany(mappedBy = "rayon")
    private List<Territory> territoryList2;
    @JoinColumn(name = "rayon", referencedColumnName = "id")
    @ManyToOne
    private Territory rayon;

    public Territory() {
    }

    public Territory(Integer id) {
        this.id = id;
    }

    public Territory(Integer id, String code) {
        this.id = id;
        this.code = code;
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

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getShortname() {
        return shortname;
    }

    public void setShortname(String shortname) {
        this.shortname = shortname;
    }

    public Integer getHierarchylevel() {
        return hierarchylevel;
    }

    public void setHierarchylevel(Integer hierarchylevel) {
        this.hierarchylevel = hierarchylevel;
    }

    public Boolean getIslowestlevel() {
        return islowestlevel;
    }

    public void setIslowestlevel(Boolean islowestlevel) {
        this.islowestlevel = islowestlevel;
    }

    public TerritoryType getType() {
        return type;
    }

    public void setType(TerritoryType type) {
        this.type = type;
    }

    @XmlTransient
    public List<Territory> getTerritoryList() {
        return territoryList;
    }

    public void setTerritoryList(List<Territory> territoryList) {
        this.territoryList = territoryList;
    }

    public Territory getParent() {
        return parent;
    }

    public void setParent(Territory parent) {
        this.parent = parent;
    }

    @XmlTransient
    public List<Territory> getTerritoryList1() {
        return territoryList1;
    }

    public void setTerritoryList1(List<Territory> territoryList1) {
        this.territoryList1 = territoryList1;
    }

    public Territory getRegion() {
        return region;
    }

    public void setRegion(Territory region) {
        this.region = region;
    }

    @XmlTransient
    public List<Territory> getTerritoryList2() {
        return territoryList2;
    }

    public void setTerritoryList2(List<Territory> territoryList2) {
        this.territoryList2 = territoryList2;
    }

    public Territory getRayon() {
        return rayon;
    }

    public void setRayon(Territory rayon) {
        this.rayon = rayon;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 43 * hash + Objects.hashCode(this.id);
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
        final Territory other = (Territory) obj;
        return Objects.equals(this.id, other.id);
    }

    @Override
    public String toString() {
        return "com.di.pf.domain.Territory[ id=" + id + " ]";
    }

    @Override
    public void addJson(JsonObjectBuilder builder) {

        builder.add("id", id).add("fullname", fullname);

    }

}
