# 개인 개발 블로그 프로젝트


## 1️⃣프로젝트 소개

이 프로젝트는 **개인 개발 블로그**로, Next.js를 기반으로 만들어졌습니다.  
사용자는 블로그 게시물을 작성, 수정, 삭제할 수 있으며 게시물 목록을 다양한 정렬 기준(기본순/최신순/제목순)으로 확인할 수 있습니다.

### **개발 기간**
**2025.1.21 ~ 2025.1.24**   

### **기술 스택**
**Next.js / TailwindCSS / ShadCN UI / Zustand (로컬 스토리지 연동)**

### **주요 기능**
1. 게시물 CRUD (생성, 조회, 수정, 삭제)
2. 게시물 목록 조회 및 검색
3. 게시물 정렬 (기본순, 최신순, 제목순)


---


## 2️⃣실행 방법

### **방법 1: 링크 접속**
배포된 링크에서 바로 접속 가능합니다.  
➡ **[https://new-blog-ecru.vercel.app](https://new-blog-ecru.vercel.app)**

### **방법 2: 로컬에서 실행**
> ⚠ **Node.js 및 npm 최신 LTS 버전 필요**  
> 프로젝트의 정상적인 실행을 위해 Node.js와 npm의 최신 버전을 맞춰주세요.

1. **프로젝트 클론**
   ```bash
   git clone https://github.com/your-github-repo/new-blog.git
   cd new-blog
2. **의존성 설치**
   ```bash
   npm install
3. **프로젝트 빌드**
   ```bash
   npm run build
4. **서버 실행**
   ```bash
   npm run start
5. **로컬에서 접속**   
   브라우저에서 http://localhost:3000로 접속합니다.


---


## 3️⃣사용한 ShadCN 컴포넌트 목록
### **🔔알림**
- **`Toast`** 
- **`Alert Dialog`** 

### **👁️‍🗨️조회**
- **`Table`** :  
- **`Card`** :  
- **`Pagination`** :  
- **`Dropdown Menu`** :  

### **✍️입력**
- **`Button`** :  
- **`Label`** :  
- **`Input`** :  
- **`Textarea`** :  


---


## 4️⃣상태 관리 방식 설명

### **사용한 상태 관리 라이브러리**
- 프로젝트에서는 **Zustand** 상태 관리 라이브러리를 사용하고 있습니다.

### **Zustand를 사용한 이유**
1. 간편한 API로 상태 관리를 쉽게 구현 가능
2. Redux 대비 코드가 간결하며 보일러플레이트 코드가 적음

### **상태 관리 흐름**
1. **게시물 추가 (`addPost`)**  
   사용자가 게시물을 추가하면 Zustand의 `addPost` 액션을 통해 상태가 업데이트되고 로컬 스토리지에 저장됩니다.
   
2. **게시물 삭제 (`removePost`)**  
   특정 게시물을 삭제할 경우 해당 게시물이 Zustand 상태에서 제거되고 로컬 스토리지에서도 삭제됩니다.

3. **게시물 불러오기 (`loadPosts`)**  
   사용자가 페이지에 방문할 때 로컬 스토리지에 저장된 게시물을 Zustand 상태로 불러옵니다.


---


## 5️⃣추후 개발 기능
- **개발**   

  ☑️ 컴포넌트 수정   

  ☑️ 코드 리팩토링

- **블로그 기능**  

  ☑️**게시물 상세 조회 페이지 검색 오류 수정**  

  ☑️**게시물에 해시태그 기능 추가**  

  ☑️**사진 및 파일 업로드 기능**  

  ☑️**사용자 프로필 CRUD 추가**   
