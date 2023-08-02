package com.mirrorview.global.auth.oauth.publickey;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface PublicKeyRepository extends CrudRepository<PublicKeyDto, String> {

}
