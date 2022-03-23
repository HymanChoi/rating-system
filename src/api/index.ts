import service from "@/utils/axios";

/**
 *
 */
export function searchMovieFormDouBan(params: any) {
  return service.request({
    url: "/api/v2/movie/search",
    method: "get",
    params,
  });
}
