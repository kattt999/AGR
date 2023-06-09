package com.topwulian.service.impl;

import com.topwulian.dao.FileDao;
import com.topwulian.model.FileInfo;
import com.topwulian.model.FileSource;
import com.topwulian.service.FileService;
import com.topwulian.utils.FileUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
public abstract class AbstractFileService implements FileService {

	protected abstract FileDao getFileDao();

	@Override
	public FileInfo upload(MultipartFile file) throws Exception {
		FileInfo fileInfo = FileUtil.getFileInfo(file);
		FileInfo oldFileInfo = getFileDao().getById(fileInfo.getId());

		if (oldFileInfo != null) {
			return oldFileInfo;
		}

		if (!fileInfo.getName().contains(".")) {
			throw new IllegalArgumentException("缺少后缀名");
		}

		uploadFile(file, fileInfo);

		fileInfo.setSource(fileSource().name());// 设置文件来源
		getFileDao().save(fileInfo);// 将文件信息保存到数据库

		log.info("上传文件：{}", fileInfo);

		return fileInfo;
	}

	/**
	 * 文件来源
	 * 
	 * @return
	 */
	protected abstract FileSource fileSource();

	/**
	 * 上传文件
	 * 
	 * @param file
	 * @param fileInfo
	 */
	protected abstract void uploadFile(MultipartFile file, FileInfo fileInfo) throws Exception;

	@Override
	public void delete(FileInfo fileInfo) {
		deleteFile(fileInfo);
		getFileDao().delete(fileInfo.getId());
		log.info("删除文件：{}", fileInfo);
	}

	/**
	 * 删除文件资源
	 * 
	 * @param fileInfo
	 * @return
	 */
	protected abstract boolean deleteFile(FileInfo fileInfo);
}
