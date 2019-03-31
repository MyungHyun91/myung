<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html> 
<head> 
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR"> 
<title>DB로 데이터 보내기</title> 
</head> 
<body> 
<% 
      try { 
           String driver="oracle.jdbc.driver.OracleDriver"; 
           Class.forName(driver); 
           String url=" jdbc:oracle:thin:@ 106.10.58.146: PORT번호 : 오라클SID " ; 
           String userName="DB유저네임" ; 
           String passWord="DB비번" ; 
           Connection con = DriverManager.getConnection(url,userName,passWord); 
           Statement st = con.createStatement(); 
            //sql안의 데이터 보여주기 
             String sql2="select * from general"; 
             ResultSet rs = st.executeQuery(sql2); 
             while(rs.next()){ 
             String s = rs.getString("gname"); 
             long n1 = rs.getLong("gage"); 
             long n2 = rs.getLong("gmoney"); 

             String strXML=" "; 
             strXML+="<general>"; 
             strXML+=	"<person>"; 
             strXML+=	"<name>"+ s +"</name>"; 
             strXML+=	"<age>"+ n1 +"</age>"; 
             strXML+=	"<salary>"+ n2 +"</salary>"; 
             strXML+=	"</person>"; 
             strXML+="</general>"; 
             out.write(strXML); 

          } catch (Exception e) { 
                   System.out.println(e);	
         } 

%> 

</body> 
</html>