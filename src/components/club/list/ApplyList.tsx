import React, { ChangeEventHandler, useCallback, useEffect, useState } from 'react';
import styles from '../../../styles/pages/list_page/ApplyList.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import {
    MainClubListResType,
    MainClubReadResType,
} from '../../../api/main/club';
import axios from 'axios';

//여기에는 서치와 필터가 있음.


type ListType = {
    clubs: MainClubListResType;
    bookmark: any | null;
    // filter: any
};

const categoryPlace = ['강남', '안국', '온라인'];
const categoryDay = ['수', '목', '금', '토', '일'];




export default function Category({ clubs }: ListType) {

    console.log('clubs', clubs);
    const [isDropDownPlaceOpen, setIsDropDownPlaceOpen] = useState(false); //드롭다운 활성화 여부
    const [isChecked, setisChecked] = useState(false); //카테고리의 항목 클릭시 여부
    // const [isAdded, setisAdded] = useState([]);

    //li태그를 클릭시 해당 태그의 클래스네임에 속한 단어에 따라 해당 카테고리의 드롭다운을 활성화 할수있도록 state를 변경시키는 함수
    //민정님 로직 참고
    const onClickListener = () => {
        setIsDropDownPlaceOpen(!isDropDownPlaceOpen);
    }

    useEffect(() => {

        const addFilter = async () => {
            setisChecked(!isChecked); //checked

            //네모 클릭시 그 네모의 부모엘리먼트의 텍스트를 찾아서, if문으로 club의 place와 비교
            const svgs = document.getElementsByClassName("dropDownImg"); //체크박스 이미지의 엘리먼트 가져오기. 
            //엘리먼트 묶음을 가져오게 됨. 
            for (let i = 0; i < svgs.length; i++) { //그래서 for문을 돌림
                let element = svgs[i]; //그 중 i번째 엘리먼트가 클릭한 실제 체크박스 이미지 엘리먼트.
                let placeTxt = element.previousSibling?.textContent; //체크박스 이미지엘리먼트와 장소가 적힌 div 엘리먼트가 형제관계에 놓여있으므로 previousSibling 을 사용하여 장소 (ex) 강남) 엘리먼트의 textContent를 가져옴.
                console.log(placeTxt); // "강남"이 찍힘

                for (let j = 0; j < clubs.length; j++) { //props중 clubs의 j번째 요소의 
                    if (placeTxt === clubs[j].place) { //place가 "강남"인 것을 찾으면
                        // 그 클럽데이터만을 가져와서 ClubCard.tsx에 props로 전달하게 함.
                        //const clubsFilteredPlace = await Club.findAll({where: { place: req.}})

                    }
                }
            }

        }

    }
    })



return (
    <div className={styles.ApplyList}>
        <div className={styles.ApplyListContainer}>
            <div className={styles.search}>
                <div>
                    <FaUserCircle className={styles.icon} />
                </div>
                <form className={styles.searchInputForm}>
                    <input className={styles.searchInput} placeholder="클럽장 혹은 클럽명을 검색해보세요." />
                </form>
            </div>
            <div className={styles.filter}>
                <li className={styles.place} value="강남" onClick={onClickListener} key="place">
                    강남
                        <div
                        className={
                            isDropDownPlaceOpen
                                ? `${styles.isDropDownPlaceOpen}`
                                : `${styles.DropDownNone}`
                        }
                    >
                        <div className={styles.dropDownPlace}>
                            <div className="dropDownName">강남</div>
                            <div className="dropDownImg" onClick={addFilter} style={{ cursor: "pointer" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" style={{ height: "16px", verticalAlign: "middle", width: "16px", marginBottom: "3px", marginRight: "10px" }}>
                                    <g fill="none" fill-rule="nonzero"><rect width="16" height="16" fill="#E4E4E4" rx="2"></rect>
                                        <path fill="#FFF" stroke="#FFF" stroke-width=".6" d="M6.905 10.316l4.73-5.073a.472.472 0 0 1 .66-.03.464.464 0 0 1 .018.661l-5.034 5.398a.475.475 0 0 1-.429.143.469.469 0 0 1-.29-.136L3.772 8.49a.47.47 0 0 1-.003-.657.465.465 0 0 1 .658.003l2.478 2.479v.001z">
                                        </path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div className={styles.dropDownPlace}>
                            <div className={styles.dropDownName}>안국</div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" style={{ height: "16px", verticalAlign: "middle", width: "16px", marginBottom: "3px", marginRight: "10px" }}>
                                    <g fill="none" fill-rule="nonzero"><rect width="16" height="16" fill="#E4E4E4" rx="2"></rect>
                                        <path fill="#FFF" stroke="#FFF" stroke-width=".6" d="M6.905 10.316l4.73-5.073a.472.472 0 0 1 .66-.03.464.464 0 0 1 .018.661l-5.034 5.398a.475.475 0 0 1-.429.143.469.469 0 0 1-.29-.136L3.772 8.49a.47.47 0 0 1-.003-.657.465.465 0 0 1 .658.003l2.478 2.479v.001z">
                                        </path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div className={styles.dropDownPlace}>
                            <div className={styles.dropDownName}>온라인</div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" style={{ height: "16px", verticalAlign: "middle", width: "16px", marginBottom: "3px", marginRight: "10px" }}>
                                    <g fill="none" fill-rule="nonzero"><rect width="16" height="16" fill="#E4E4E4" rx="2"></rect>
                                        <path fill="#FFF" stroke="#FFF" stroke-width=".6" d="M6.905 10.316l4.73-5.073a.472.472 0 0 1 .66-.03.464.464 0 0 1 .018.661l-5.034 5.398a.475.475 0 0 1-.429.143.469.469 0 0 1-.29-.136L3.772 8.49a.47.47 0 0 1-.003-.657.465.465 0 0 1 .658.003l2.478 2.479v.001z">
                                        </path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </li>

            </div>

        </div>
    </div>
);
}
{/* <div
                                className={
                                    isDropDownDayOpen
                                        ? `${styles.isDropDownDayOpen}`
                                        : `${styles.DropDownNone}`
                                }
                            >
                                {
                                    categoryDay.map(day => {
                                        console.log('day?', day);
                                        <div className={styles.dropDownDay}>
                                            {day}
                                        </div>
                                    })

                                }

                            </div> */}

//필터 드롭다운 구현
//드롭다운시에 그 영역마다 필터링이 되야함.

{/* <div className={styles.dropDown}>
                                    <Link to="/login">일반 로그인</Link>
                                </div>
                                <div className={styles.dropDown}>
                                    <Link to="/master/login">클럽장 로그인</Link>
                                </div> */}