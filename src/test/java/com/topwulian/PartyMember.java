package com.topwulian;

import cn.afterturn.easypoi.excel.annotation.Excel;

/**
 * @Author: szz
 * @Date: 2019/1/10 下午4:47
 * @Version 1.0
 */
public class PartyMember {

    @Excel(name = "姓名",orderNum = "1")
    private String name;
    @Excel(name = "身份证",orderNum = "2")
    private String idCard;
    @Excel(name = "入党时间",orderNum = "3",format = "yyyy-MM-dd")
    private String joinPartyTime;
    @Excel(name = "党支部",orderNum = "4")
    private String partyBranch;
    @Excel(name = "党员状态",orderNum = "5",replace = {"在职_1","离职_2"},isImportField = "true")
    private String state;

    @Override
    public String toString() {
        return "PartyMember{" +
                "name='" + name + '\'' +
                ", idCard='" + idCard + '\'' +
                ", joinPartyTime='" + joinPartyTime + '\'' +
                ", partyBranch='" + partyBranch + '\'' +
                ", state='" + state + '\'' +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public String getJoinPartyTime() {
        return joinPartyTime;
    }

    public void setJoinPartyTime(String joinPartyTime) {
        this.joinPartyTime = joinPartyTime;
    }

    public String getPartyBranch() {
        return partyBranch;
    }

    public void setPartyBranch(String partyBranch) {
        this.partyBranch = partyBranch;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
