package com.ssafy.happy.model.service;

import java.sql.SQLException;
import java.util.List;

import com.ssafy.happy.dto.Notice;

public interface NoticeService {

	Notice select(int no) throws SQLException;
	List<Notice> selectAll() throws SQLException;
	int insert(Notice notice) throws SQLException;
    int delete(int no) throws SQLException;
    int update(Notice notice) throws SQLException;
    void updateHit(int no);
}
