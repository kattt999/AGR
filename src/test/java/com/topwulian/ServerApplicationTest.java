package com.topwulian;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jms.core.JmsMessagingTemplate;
import org.springframework.test.context.junit4.SpringRunner;



@RunWith(SpringRunner.class)
@SpringBootTest
public class ServerApplicationTest {


    @Autowired
    private JmsMessagingTemplate jmsMessagingTemplate;

	@Test
	public void test1() throws InterruptedException {
//            jmsMessagingTemplate.convertAndSend("queue_gather", "5a5ab02a04100200d8041102029c021702fdf4021802ffff0319020000012002004605120400000000f9".getBytes());
	}

	//@Test
    public void importExcel(){
//	    String filePath="/Users/szz/app/1.xlsx";
//        List<PartyMember> partyMembers = EasyPoiUtil.importExcel(filePath, 0, 1, PartyMember.class);
//        System.out.println(partyMembers.size());
//        for (PartyMember partyMember : partyMembers) {
//            System.out.println(partyMember);
//        }


    }
}
