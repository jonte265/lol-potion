import Image from "next/image"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import Typography from "../common/typography/Typography"
import { cleanItemDescription } from "@/lib/format"

export default function ItemInventory({ item, size }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="shrink-0 rounded-xs bg-primary/40"
    >
      {item && (
        <Tooltip>
          <TooltipTrigger>
            <Image
              className="rounded-xs"
              src={item.imageUrl}
              width={size}
              height={size}
              alt={`${item.itemInfo.name} icon`}
            />
          </TooltipTrigger>

          <TooltipContent>
            <div className="flex flex-col flex-wrap gap-2">
              <div className="flex flex-col">
                <Typography bold>{item.itemInfo.name}</Typography>
                <Typography light>{item.itemInfo.plaintext}</Typography>
              </div>
              <div className="whitespace-pre-line">
                <Typography>
                  {cleanItemDescription(item.itemInfo.description)}
                </Typography>
              </div>
              <div className="flex flex-col">
                <div className="text-orange-400">
                  <Typography>
                    Cost: {item.itemInfo.gold.total} ({item.itemInfo.gold.sell})
                  </Typography>
                </div>
                <div className="flex flex-row flex-wrap gap-1">
                  {item.itemInfo.tags.map((tag) => (
                    <Typography small key={tag} light>
                      ({tag})
                    </Typography>
                  ))}
                </div>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}
