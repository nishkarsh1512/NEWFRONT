import { Button } from "@mui/material"
import { memo } from "react"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import EmailIcon from "@mui/icons-material/Email"

interface Props {
  member: {
    name: string

    image: string
    socials: {
      linkedIn: string
      email: string
    }
  }
}

const TeamCard = ({ member }: Props) => {
  const { image, name, socials } = member

  return (
    <div className="shadow-xl rounded-xl flex flex-col relative min-w-[18rem] min-h-[23rem] mb-40 transition-all duration-500 hover:scale-110 cursor-pointer">
      <div className="flex items-center justify-center pt-10">
        <img
          src={image}
          alt=""
          className="w-[140px] h-[140px] rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-[22px] font-medium">{name}</p>
        <p className="text-black/40 text-sm font-medium">{socials.email}</p>
      </div>

      <div className="flex items-center w-full justify-around absolute bottom-5">
        <Button
          className="flex items-center gap-1.5"
          onClick={() => window?.open(socials?.linkedIn)}
        >
          <LinkedInIcon className="text-black/50" />
          <span className="normal-case text-black/50">LinkedIn</span>
        </Button>

        {/* <a
          href={`mailto:${socials.email}`}
          className="flex items-center gap-1.5"
          target="_blank"
          rel="noreferrer"
        >
          <EmailIcon className="text-black/50" />
          <span className="normal-case text-black/50">Email</span>
        </a> */}
      </div>
    </div>
  )
}

export default memo(TeamCard)
