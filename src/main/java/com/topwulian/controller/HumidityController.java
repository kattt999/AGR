package com.topwulian.controller;

import java.util.List;
import java.util.concurrent.CountDownLatch;

//import com.beidouapp.et.client.api.ISDK;
//import com.beidouapp.et.client.callback.ICallback;
import com.aliyuncs.CommonRequest;
import com.aliyuncs.CommonResponse;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.exceptions.ServerException;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;
import com.topwulian.annotation.LogAnnotation;
import com.topwulian.config.EtContextConfig;
import com.topwulian.dto.ResponseInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.topwulian.page.table.PageTableRequest;
import com.topwulian.page.table.PageTableHandler;
import com.topwulian.page.table.PageTableResponse;
import com.topwulian.page.table.PageTableHandler.CountHandler;
import com.topwulian.page.table.PageTableHandler.ListHandler;
import com.topwulian.dao.HumidityDao;
import com.topwulian.model.Humidity;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/humiditys")
public class HumidityController {

    @Autowired
    private HumidityDao humidityDao;

    @Autowired
    //private ISDK sdk;

    @GetMapping("/findAll")
    @ApiOperation(value = "获取最近10个湿度数据")
    public List<Humidity> findAll() {
        return humidityDao.findAll();
    }

    @LogAnnotation
    @ApiOperation(value = "湿度传感器开关")
    @PostMapping("/switch/{alert_value}")
    public static void controlling(String Args,String productKey,String DeviceName,String Indetifier) {
        //default things
        DefaultProfile profile = DefaultProfile.getProfile("cn-shanghai", "<accessKeyId>", "<accessSecret>");
        IAcsClient client = new DefaultAcsClient(profile);

        CommonRequest request = new CommonRequest();
        request.setSysMethod(MethodType.POST);
        request.setSysDomain("iot.cn-shanghai.aliyuncs.com");
        request.setSysVersion("2018-01-20");
        request.setSysAction("InvokeThingService");
        request.putQueryParameter("RegionId", "cn-shanghai");
        request.putQueryParameter("Args", "{"+Args+"}");
        request.putQueryParameter("Identifier", Indetifier);
        request.putQueryParameter("ProductKey", productKey);
        request.putQueryParameter("DeviceName", DeviceName);
        try {
            CommonResponse response = client.getCommonResponse(request);
            System.out.println(response.getData());
        } catch (ServerException e) {
            e.printStackTrace();
        } catch (ClientException e) {
            e.printStackTrace();
        }
    }

    public ResponseInfo switchHumidity(@PathVariable Long alert_value) {
        System.out.println("湿度传感器控制:"+alert_value);

        //消息发送
        String msg = EtContextConfig.MSG_CONTENT;
        String msg1 = "e68891e698afe4b880e58faae78caa";
        msg = EtContextConfig.toChangeByHex(msg.getBytes());

        final CountDownLatch cdl3 = new CountDownLatch(1);
        String productKey = "a1vUUFtN0Jy",DeviceName="LEGatewayAuto_RBYY5PVGEM",Identifier;
        controlling(msg,productKey,DeviceName,Identifier=null);
        /*
        sdk.chatTo(EtContextConfig.RECEIVE_UID, msg.getBytes(), new ICallback<Void>() {
            @Override
            public void onSuccess(Void aVoid) {
                System.out.println("~~~~~~~~~chatTo(" + EtContextConfig.RECEIVE_UID + ")成功");
                cdl3.countDown();
            }

            @Override
            public void onFailure(Throwable ex) {
                System.err.println("*********chatTo(" + EtContextConfig.RECEIVE_UID + ")失败. " + ex.getLocalizedMessage());
                cdl3.countDown();
            }
        });*/
        return new ResponseInfo("1", "湿度传感器操作成功!");
    }

    @PostMapping
    @ApiOperation(value = "保存")
    public Humidity save(@RequestBody Humidity humidity) {
        humidityDao.save(humidity);
        return humidity;
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "根据id获取")
    public Humidity get(@PathVariable Long id) {
        return humidityDao.getById(id);
    }

    @PutMapping
    @ApiOperation(value = "修改")
    public Humidity update(@RequestBody Humidity humidity) {
        humidityDao.update(humidity);

        return humidity;
    }

    @GetMapping
    @ApiOperation(value = "列表")
    public PageTableResponse list(PageTableRequest request) {
        return new PageTableHandler(new CountHandler() {

            @Override
            public int count(PageTableRequest request) {
                return humidityDao.count(request.getParams());
            }
        }, new ListHandler() {

            @Override
            public List<Humidity> list(PageTableRequest request) {
                return humidityDao.list(request.getParams(), request.getOffset(), request.getLimit());
            }
        }).handle(request);
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "删除")
    public void delete(@PathVariable Long id) {
        humidityDao.delete(id);
    }
}
