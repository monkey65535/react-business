import React, {Component} from 'react';
import Nav from '../../components/Nav/Nav';
import Header from '../../components/Header/Header';
import {Link} from 'react-router-dom';
import {Carousel} from 'antd';
import './Home.scss';
class Home extends Component {
    render() {
        const keywordList = [
            [
                '手机', '数码'
            ],
            [
                '电脑', '办公配件'
            ],
            [
                '电视', '空调', '冰箱', '洗衣机'
            ],
            [
                '厨卫家电', '小家电'
            ],
            [
                '家具', '家装'
            ],
            [
                '个护化妆', '清洁用品', '纸品'
            ],
            [
                '鞋靴', '箱包', '钟表', '珠宝'
            ],
            [
                '图书', '音像', '电子书'
            ],
            [
                '母婴用品', '儿童玩具', '童装童鞋'
            ],
            ['手机', '数码']
        ];
        const floorData = [
            {
                name: '家用电器',
                goods: [
                    {
                        id: '100006',
                        name: '双开门冰箱',
                        pic: 'floor1-1'
                    }, {
                        id: '100007',
                        name: '电视',
                        pic: 'floor1-2'
                    }, {
                        id: '100008',
                        name: '洗衣机',
                        pic: 'floor1-3'
                    }, {
                        id: '100009',
                        name: '空调',
                        pic: 'floor1-4'
                    }, {
                        id: '100010',
                        name: '热水器',
                        pic: 'floor1-5'
                    }
                ]
            },
            {
                name: '数码3C',
                goods: [
                    {
                        id: '100011',
                        name: '笔记本电脑',
                        pic: 'floor2-1'
                    }, {
                        id: '100012',
                        name: '手机',
                        pic: 'floor2-2'
                    }, {
                        id: '100013',
                        name: '平板电脑',
                        pic: 'floor2-3'
                    }, {
                        id: '100014',
                        name: '数码相机',
                        pic: 'floor2-4'
                    }, {
                        id: '100015',
                        name: '3C配件',
                        pic: 'floor2-5'
                    }
                ]
            },
            {
                name: '服装箱包',
                goods: [
                    {
                        id: '100016',
                        name: '女装',
                        pic: 'floor3-1'
                    }, {
                        id: '100017',
                        name: '帽子专区',
                        pic: 'floor3-2'
                    }, {
                        id: '100018',
                        name: '旅行箱',
                        pic: 'floor3-3'
                    }, {
                        id: '100019',
                        name: '手提包',
                        pic: 'floor3-4'
                    }, {
                        id: '100020',
                        name: '保暖内衣',
                        pic: 'floor3-5'
                    }
                ]
            },
            {
                name: '食品生鲜',
                goods: [
                    {
                        id: '100021',
                        name: '最爱零食',
                        pic: 'floor4-1'
                    }, {
                        id: '100022',
                        name: '生鲜',
                        pic: 'floor4-2'
                    }, {
                        id: '100023',
                        name: '半成品菜',
                        pic: 'floor4-3'
                    }, {
                        id: '100024',
                        name: '速冻专区',
                        pic: 'floor4-4'
                    }, {
                        id: '100025',
                        name: '进口牛奶',
                        pic: 'floor4-5'
                    }
                ]
            },
            {
                name: '酒水饮料',
                goods: [
                    {
                        id: '100026',
                        name: '白酒',
                        pic: 'floor5-1'
                    }, {
                        id: '100027',
                        name: '红酒',
                        pic: 'floor5-2'
                    }, {
                        id: '100028',
                        name: '饮料',
                        pic: 'floor5-3'
                    }, {
                        id: '100029',
                        name: '调制鸡尾酒',
                        pic: 'floor5-4'
                    }, {
                        id: '100030',
                        name: '进口洋酒',
                        pic: 'floor5-5'
                    }
                ]
            }
        ];
        const bannerData = ['banner1','banner2','banner3','banner4','banner5'];
        // map 关键字
        const keyList = keywordList.map((el, i) => {
            let elList = el.map((e => (
                <Link to={`/list/keyword=${e}`} className='link' key={e}>{e}</Link>
            )))
            return (
                <li className="keywords-item" key={i}>
                    {elList}
                </li>
            )
        });
        // map 楼层
        const floorList = floorData.map((el, i) => {
            const items = el
                .goods
                .map((e, i) => {
                    return (
                        <li className="floor-item" key={e.id}>
                            <Link to={`/list/categoryId=${e.id}`}>
                                <span className="floor-text">{e.name}</span>
                                <img
                                    className="floor-img"
                                    src={require(`../../static/image/floor/${e.pic}.jpg`)}
                                    alt={e.name}/>
                            </Link>
                        </li>
                    )
                })
            return (
                <div className="floor-wrap" key={i}>
                    <h1 className="floor-title">F{i + 1} {el.name}</h1>
                    <ul className="floor-list">
                        {items}
                    </ul>
                </div>
            )
        });
        
        // map banner
        const bannerList = bannerData.map((el,i)=>{
            return (
                <div key={i}>
                    <img 
                    src={require(`../../static/image/banner/${el}.jpg`)} 
                    alt={el} 
                    width='100%' 
                    height='100%'/>
                </div>
            )
        })

        return (
            <div>
                <Nav></Nav>
                <Header></Header>
                <div className="home-container">
                    <div className="w">
                        <ul className="keywords-list">
                            {keyList}
                        </ul>
                        <div className="banner-con">
                        <Carousel autoplay>
                            {bannerList}
                        </Carousel>
                            
                        </div>
                    </div>
                    <div className="w">
                        {floorList}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;