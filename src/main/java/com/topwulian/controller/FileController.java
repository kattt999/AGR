package com.topwulian.controller;

import com.topwulian.config.FileServiceFactory;
import com.topwulian.dao.FileDao;
import com.topwulian.model.FileInfo;
import com.topwulian.page.Page;
import com.topwulian.service.FileService;
import com.topwulian.utils.PageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/files")
public class FileController {

	@Autowired
	private FileServiceFactory fileServiceFactory;

	/**
	 * 文件上传<br>
	 * 根据fileSource选择上传方式，目前仅实现了上传到本地<br>
	 * 如有需要可上传到第三方，如阿里云、七牛等
	 * 
	 * @param file
	 * @param fileSource
	 *            FileSource
	 * 
	 * @return
	 * @throws Exception
	 */
	@PostMapping
	public FileInfo upload(@RequestParam("file") MultipartFile file, String fileSource) throws Exception {
		FileService fileService = fileServiceFactory.getFileService(fileSource);
		return fileService.upload(file);
	}

	/**
	 * layui富文本文件自定义上传
	 * 
	 * @param file
	 * @param fileSource
	 * @return
	 * @throws Exception
	 */
	@PostMapping("/layui")
	public Map<String, Object> uploadLayui(@RequestParam("file") MultipartFile file, String fileSource)
			throws Exception {
		FileInfo fileInfo = upload(file, fileSource);

		Map<String, Object> map = new HashMap<>();
		map.put("code", 0);
		Map<String, Object> data = new HashMap<>();
		data.put("src", fileInfo.getUrl());
		map.put("data", data);

		return map;
	}

	/**
	 * 文件删除
	 * 
	 * @param id
	 */
	@DeleteMapping("/{id}")
	public void delete(@PathVariable String id) {
		FileInfo fileInfo = fileDao.getById(id);
		if (fileInfo != null) {
			FileService fileService = fileServiceFactory.getFileService(fileInfo.getSource());
			fileService.delete(fileInfo);
		}
	}

	@Autowired
	private FileDao fileDao;

	/**
	 * 文件查询
	 * 
	 * @param params
	 * @return
	 */
	@GetMapping
	public Page<FileInfo> findFiles(@RequestParam Map<String, Object> params) {
		int total = fileDao.count(params);
		List<FileInfo> list = Collections.emptyList();
		if (total > 0) {
			PageUtil.pageParamConver(params, true);

			list = fileDao.findData(params);
		}
		return new Page<>(total, list);
	}
}
