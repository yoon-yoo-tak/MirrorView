package com.mirrorview.querydsl;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.domain.QMember;
import com.querydsl.jpa.impl.JPAQueryFactory;

@SpringBootTest
@Transactional
public class BasicTest {

	@Autowired
	EntityManager em;

	@Test
	public void basicTest() {
		Member asd = Member.builder()
			.userId("asd")
			.build();
		em.persist(asd);
		em.flush();
		em.clear();
		JPAQueryFactory factory = new JPAQueryFactory(em);
		QMember m = QMember.member;
		Member findMember = factory
			.select(m)
			.from(m)
			.where(m.userId.eq("asd"))
			.fetchOne();
		System.out.println(findMember.getUserId());
	}
}
