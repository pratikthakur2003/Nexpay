import React from "react";
import styled from "styled-components";

const Box = styled.div`
	padding: 5% 0;
	background: #FFFFFF; /* Match the color with the header */
	width: 100%;
  color: #000000
`;

const FooterContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 1000px;
	margin: 0 auto;
`;

const Column = styled.div`
	display: flex;
	flex-direction: column;
	text-align: left;
	margin-left: 60px;
`;

const Row = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
	grid-gap: 20px;

	@media (max-width: 1000px) {
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	}
`;

const FooterLink = styled.a`
	color: #000000;
	margin-bottom: 20px;
	font-size: 18px;
	text-decoration: none;

	&:hover {
		color: #8ca6ed;
		transition: 200ms ease-in;
	}
`;

const Heading = styled.p`
	font-size: 24px;
	color: #fff;
	margin-bottom: 40px;
	font-weight: bold;
`;

const Copyright = styled.p`
  font-size: 14px;
  color: #292929;
  margin-top: 20px;
  text-align: center;
  padding: 10px 0 2px 0;
`;

const Footer = () => {
	return (
		<Box>
			<h1
				style={{
					color: "#292929", /* Match the color with the header */
					textAlign: "center",
					marginTop: "10px",
				}}
			>
				START BUYING WITH FOOTFOLIO TODAY
			</h1>

			<FooterContainer>
				<Row>
					<Column>
						<Heading>About Us</Heading>
						<FooterLink href="#">Aim</FooterLink>
						<FooterLink href="#">Vision</FooterLink>
						<FooterLink href="#">Testimonials</FooterLink>
					</Column>
					<Column>
						<Heading>Services</Heading>
						<FooterLink href="#">Writing</FooterLink>
						<FooterLink href="#">Internships</FooterLink>
						<FooterLink href="#">Coding</FooterLink>
						<FooterLink href="#">Teaching</FooterLink>
					</Column>
					<Column>
						<Heading>Help</Heading>
						<FooterLink href="#">Get Help</FooterLink>
						<FooterLink href="#">Payment Option</FooterLink>
						<FooterLink href="#">Delivery</FooterLink>
						<FooterLink href="#">Returns</FooterLink>
					</Column>
					<Column>
						<Heading>Social Media</Heading>
						<FooterLink href="#">
							<i className="fab fa-facebook-f">
								<span style={{ marginLeft: "10px" }}>Facebook</span>
							</i>
						</FooterLink>
						<FooterLink href="#">
							<i className="fab fa-instagram">
								<span style={{ marginLeft: "10px" }}>Instagram</span>
							</i>
						</FooterLink>
						<FooterLink href="#">
							<i className="fab fa-twitter">
								<span style={{ marginLeft: "10px" }}>Twitter</span>
							</i>
						</FooterLink>
						<FooterLink href="#">
							<i className="fab fa-youtube">
								<span style={{ marginLeft: "10px" }}>Youtube</span>
							</i>
						</FooterLink>
					</Column>
				</Row>
				<Copyright>
					© 2024 Imagine Marketing Limited. All Rights Reserved
				</Copyright>
			</FooterContainer>
		</Box>
	);
};

export default Footer;
