/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.domain;

import com.di.pf.domain.common.OrgType;
import com.di.pf.domain.common.TerritoryType;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import javax.json.JsonObjectBuilder;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author avg
 */
@Entity
@Table(name = "organization")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Organization.findAll", query = "SELECT o FROM Organization o"),
    @NamedQuery(name = "Organization.countAll", query = "SELECT count(o) FROM Organization o")})
public class Organization extends AbstractEntity {

    static final SimpleDateFormat DATE_FORMAT_yyyyMMdd = new SimpleDateFormat("yyyyMMdd");
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
    @JoinColumn(name = "orgtype", referencedColumnName = "id")
    @ManyToOne
    private OrgType orgtype;
    @Size(max = 250)
    @Column(name = "branchcode")
    private String branchcode;
    @Size(max = 250)
    @Column(name = "organhead")
    private String organhead;
    @Basic(optional = false)
    @NotNull
    @Column(name = "location")
    private int location;
    @Size(max = 250)
    @Column(name = "address")
    private String address;
    @Size(max = 250)
    @Column(name = "certnumber")
    private String certnumber;
    @Column(name = "certdate")
    @Temporal(TemporalType.DATE)
    private Date certdate;
    @Basic(optional = false)
    @NotNull
    @Column(name = "isdeleted")
    private boolean isdeleted;
    @Column(name = "deletedate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date deletedate;
    @Size(max = 250)
    @Column(name = "bankreq")
    private String bankreq;
    // @Pattern(regexp="^\\(?(\\d{3})\\)?[- ]?(\\d{3})[- ]?(\\d{4})$", message="Invalid phone/fax format, should be as xxx-xxx-xxxx")//if the field contains phone or fax number consider using this annotation to enforce field validation
    @Size(max = 250)
    @Column(name = "phone")
    private String phone;
    // @Pattern(regexp="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", message="Invalid email")//if the field contains email address consider using this annotation to enforce field validation
    @Size(max = 250)
    @Column(name = "email")
    private String email;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "headorgan")
    private List<Organization> organizationList;
    @JoinColumn(name = "headorgan", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Organization headorgan;

    public Organization() {
    }

    public Organization(Integer id) {
        this.id = id;
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

    public OrgType getOrgtype() {
        return orgtype;
    }

    public void setOrgtype(OrgType orgtype) {
        this.orgtype = orgtype;
    }

    public String getBranchcode() {
        return branchcode;
    }

    public void setBranchcode(String branchcode) {
        this.branchcode = branchcode;
    }

    public String getOrganhead() {
        return organhead;
    }

    public void setOrganhead(String organhead) {
        this.organhead = organhead;
    }

    public int getLocation() {
        return location;
    }

    public void setLocation(int location) {
        this.location = location;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCertnumber() {
        return certnumber;
    }

    public void setCertnumber(String certnumber) {
        this.certnumber = certnumber;
    }

    public Date getCertdate() {
        return certdate;
    }

    public void setCertdate(Date certdate) {
        this.certdate = certdate;
    }

    public boolean getIsdeleted() {
        return isdeleted;
    }

    public void setIsdeleted(boolean isdeleted) {
        this.isdeleted = isdeleted;
    }

    public Date getDeletedate() {
        return deletedate;
    }

    public void setDeletedate(Date deletedate) {
        this.deletedate = deletedate;
    }

    public String getBankreq() {
        return bankreq;
    }

    public void setBankreq(String bankreq) {
        this.bankreq = bankreq;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @XmlTransient
    public List<Organization> getOrganizationList() {
        return organizationList;
    }

    public void setOrganizationList(List<Organization> organizationList) {
        this.organizationList = organizationList;
    }

    public Organization getHeadorgan() {
        return headorgan;
    }

    public void setHeadorgan(Organization headorgan) {
        this.headorgan = headorgan;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 29 * hash + Objects.hashCode(this.id);
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
        final Organization other = (Organization) obj;
        return Objects.equals(this.id, other.id);
    }

    @Override
    public String toString() {
        return "com.di.pf.domain.Organization[ id=" + id + " ]";
    }

    @Override
    public void addJson(JsonObjectBuilder builder) {
        builder.add("id", id).add("name", name).add("orgCode", code).add("orgTypeId", orgtype.getId()).add("orgTypeName", orgtype.getName())
                .add("orgTypeCode", orgtype.getCode()).add("organHead", organhead).add("location", location).add("address", address)
                ;//.add("certNumber", certnumber).add("certDate", certdate == null ? "" : DATE_FORMAT_yyyyMMdd.format(certdate));//.add("isDeleted", isdeleted);

    }
}
