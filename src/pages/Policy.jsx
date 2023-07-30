import React from 'react'
import Layout from '../components/Layout/Layout'
// import contactUs from "../images/contactus.jpeg"
const Policy = () => {
  return (
    <Layout title={"Policy"}>
        <div className='productPolicyContainer'>
          <div>
            <img src="https://www.alert-software.com/hs-fs/hubfs/writing%20company%20policies.png?width=1280&name=writing%20company%20policies.png" width={600} height={550} alt="about" />
          </div>
          <div className='policy_right-container'>
              <ul>
                <li>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</li>
                <li>If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</li>
                <li>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet</li>
                <li>It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc</li>
              </ul>
          </div>
        </div>
    </Layout>
  )
}

export default Policy