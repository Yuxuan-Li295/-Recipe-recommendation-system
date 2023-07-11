import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GithubCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // 从URL中获取授权码

    // TODO: 使用授权码向Github API请求访问令牌，并处理登录逻辑

    // 登录成功后，重定向用户到主页
    navigate('/homepage');
  }, [navigate]);

  return <div>Loading...</div>;
}

export default GithubCallback;
