<script lang="ts">
  import Logo from '$assets/doonglegae-logo-128.png';
</script>

<header class="bg-slate-100 text-gray-800 shadow-xs drop-shadow-sm">
  <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
    <a class="flex items-center gap-2" href="./">
      <img class="h-12 w-12" alt="둥글게 말하기 로고" src={Logo} />
      <div>
        <h1 class="text-xl font-semibold">둥글게 말하기</h1>
        <p class="mt-1 text-xs text-gray-600">말을 둥글게 바꿔줍니다</p>
      </div>
    </a>
    <div>
      <a class="text-gray-600 transition-colors hover:text-gray-800" href="./graph">그래프로 보기</a>
    </div>
  </div>
</header>
