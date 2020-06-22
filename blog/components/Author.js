import {Avatar,Divider} from 'antd'
import {GithubOutlined,QqOutlined,WechatOutlined} from '@ant-design/icons'
import '../static/style/components/author.css'

const Author =()=>{
    return (
        <div className="author-div">
            <div> <Avatar size={100} src="https://img30.360buyimg.com/mobilecms/jfs/t1/125205/38/197/27600/5eb3d498E823d93bf/4ea3fdc4fbc1781d.jpg"  /></div>
            <div className="author-introduction">
                光头程序员，专注于WEB和移动前端开发。要录1000集免费前端视频的傻X。此地维权无门，此时无能为力，此心随波逐流。
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={<GithubOutlined />} className="account"  />
                <Avatar size={28} icon={<QqOutlined />}  className="account" />
                <Avatar size={28} icon={<WechatOutlined />}  className="account"  />

            </div>
        </div>
    )

}

export default Author