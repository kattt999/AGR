package com.topwulian.service;

import com.topwulian.model.SysLogs;

/**
 * 日志service
 * 
 * @author 小威老师 xiaoweijiagou@163.com
 *
 *         2017年8月19日
 */
public interface SysLogService {

	void save(SysLogs sysLogs);

	void save(Long userId, String module, Boolean flag, String remark);

	void deleteLogs();
}
